-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    email TEXT,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    owner_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create project_members table
CREATE TABLE IF NOT EXISTS project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('owner', 'maintainer', 'contributor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    assigned_to TEXT REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Simplified for development)
-- In production, these should be more restrictive

CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Users can view projects they are members of" ON projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_id = projects.id AND user_id = auth.uid()::text
        ) OR owner_id = auth.uid()::text
    );

CREATE POLICY "Owners can update projects" ON projects
    FOR UPDATE USING (owner_id = auth.uid()::text);

CREATE POLICY "Owners can delete projects" ON projects
    FOR DELETE USING (owner_id = auth.uid()::text);

CREATE POLICY "Members can view tasks" ON tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_id = tasks.project_id AND user_id = auth.uid()::text
        ) OR EXISTS (
            SELECT 1 FROM projects
            WHERE id = tasks.project_id AND owner_id = auth.uid()::text
        )
    );

CREATE POLICY "Members can manage tasks" ON tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM project_members
            WHERE project_id = tasks.project_id AND user_id = auth.uid()::text
        ) OR EXISTS (
            SELECT 1 FROM projects
            WHERE id = tasks.project_id AND owner_id = auth.uid()::text
        )
    );

-- Create stream sources table
CREATE TABLE IF NOT EXISTS stream_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('receiver', 'network', 'file')),
    url TEXT NOT NULL,
    host TEXT,
    port TEXT,
    path TEXT,
    active BOOLEAN DEFAULT false,
    last_connected TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_stream_sources_updated_at
    BEFORE UPDATE ON stream_sources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
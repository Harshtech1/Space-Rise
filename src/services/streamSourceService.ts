import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export interface StreamSource {
  id: string;
  name: string;
  type: "receiver" | "network" | "file";
  url: string;
  host?: string;
  port?: string;
  path?: string;
  active: boolean;
  lastConnected?: Date;
}

export const streamSourceService = {
  // Get all stream sources
  getSources: async () => {
    const { data, error } = await supabase
      .from("stream_sources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch stream sources");
      throw error;
    }

    return data;
  },

  // Get active stream source
  getActiveSource: async () => {
    const { data, error } = await supabase
      .from("stream_sources")
      .select("*")
      .eq("active", true)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      toast.error("Failed to fetch active source");
      throw error;
    }

    return data;
  },

  // Add a new stream source
  addSource: async (source: Omit<StreamSource, "id" | "active">) => {
    const { data, error } = await supabase
      .from("stream_sources")
      .insert([
        {
          ...source,
          active: false,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Failed to add new source");
      throw error;
    }

    toast.success(`Added new source: ${source.name}`);
    return data;
  },

  // Update an existing stream source
  updateSource: async (id: string, updates: Partial<StreamSource>) => {
    const { data, error } = await supabase
      .from("stream_sources")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to update source");
      throw error;
    }

    toast.success(`Updated source: ${data.name}`);
    return data;
  },

  // Delete a stream source
  deleteSource: async (id: string) => {
    const { error } = await supabase
      .from("stream_sources")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete source");
      throw error;
    }

    toast.success("Source deleted successfully");
    return true;
  },

  // Connect to a stream source
  connectToSource: async (id: string) => {
    // First, set all sources to inactive
    const { error: deactivateError } = await supabase
      .from("stream_sources")
      .update({ active: false })
      .neq("id", id);

    if (deactivateError) {
      toast.error("Failed to deactivate other sources");
      throw deactivateError;
    }

    // Then activate the selected source
    const { data, error } = await supabase
      .from("stream_sources")
      .update({
        active: true,
        last_connected: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to connect to source");
      throw error;
    }

    toast.success(`Connected to: ${data.name}`);
    return data;
  },

  // Disconnect from current source
  disconnect: async () => {
    const { data: activeSource } = await supabase
      .from("stream_sources")
      .select("*")
      .eq("active", true)
      .single();

    if (!activeSource) {
      return false;
    }

    const { error } = await supabase
      .from("stream_sources")
      .update({ active: false })
      .eq("id", activeSource.id);

    if (error) {
      toast.error("Failed to disconnect from source");
      throw error;
    }

    toast.success(`Disconnected from: ${activeSource.name}`);
    return true;
  },
};

-- Add automatic data retention policies
-- This will automatically delete old data after 2 years

-- Create a trigger to delete old visits (older than 2 years)
CREATE TRIGGER IF NOT EXISTS delete_old_visits
AFTER INSERT ON visits
BEGIN
    DELETE FROM visits 
    WHERE created_at < datetime('now', '-2 years');
END;

-- Create a trigger to delete old link clicks (older than 2 years)
CREATE TRIGGER IF NOT EXISTS delete_old_link_clicks
AFTER INSERT ON link_clicks
BEGIN
    DELETE FROM link_clicks 
    WHERE created_at < datetime('now', '-2 years');
END;

-- Create a trigger to delete visitors with no remaining visits/clicks
CREATE TRIGGER IF NOT EXISTS delete_orphaned_visitors
AFTER DELETE ON visits
BEGIN
    DELETE FROM visitors 
    WHERE id NOT IN (
        SELECT DISTINCT visitor_id FROM visits 
        UNION 
        SELECT DISTINCT visitor_id FROM link_clicks
    );
END;

CREATE TRIGGER IF NOT EXISTS delete_orphaned_visitors_from_clicks
AFTER DELETE ON link_clicks
BEGIN
    DELETE FROM visitors 
    WHERE id NOT IN (
        SELECT DISTINCT visitor_id FROM visits 
        UNION 
        SELECT DISTINCT visitor_id FROM link_clicks
    );
END; 
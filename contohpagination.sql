SELECT * FROM pagination(:page_number, :page_size)


    SELECT "user".id, "user".username, "user".password
    FROM "user"
    ORDER BY "user".id ASC
    LIMIT 10
    OFFSET ((2-1) * 10);


CREATE OR REPLACE FUNCTION pagination(
  table_name VARCHAR, 
  page INTEGER, 
  page_size INTEGER
) 
RETURNS TABLE (
  row_number BIGINT, 
  id INTEGER, 
  username VARCHAR, 
  password VARCHAR
) AS $$ 
BEGIN
  RETURN QUERY 
 SELECT ROW_NUMBER() OVER () as row_number,
"user".id,
"user".username,
CAST("user".password AS character varying)
FROM "user"
LIMIT page_size
OFFSET (page - 1) * page_size;
END;
$$ LANGUAGE plpgsql;



DROP FUNCTION IF EXISTS pagination(character varying, integer, integer);



SELECT * FROM pagination('user', 2, 10);

SELECT * FROM "user"

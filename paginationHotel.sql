CREATE FUNCTION hotel.pagination(page integer, page_size integer) 
RETURNS TABLE(row_number bigint, hotel_id integer, hotel_name character varying, 
			  hotel_rating_star numeric, status character varying, hotel_modified_date timestamp)
    LANGUAGE plpgsql
AS $$ 
BEGIN
  RETURN QUERY 
    SELECT ROW_NUMBER() OVER () as row_number,
           hotels.hotel_id,
           hotels.hotel_name,
           hotels.hotel_rating_star,
           hotels.status,
           hotels.hotel_modified_date
    FROM hotel.hotels
    LIMIT page_size
    OFFSET (page - 1) * page_size;
END;
$$;

DROP FUNCTION IF EXISTS hotel.pagination(integer, integer);


SELECT * FROM hotel.pagination(2, 10);



USE [Location]
GO

IF OBJECT_ID('Get_Geo_Info') IS NOT NULL
	DROP PROC Get_Geo_Info
GO

CREATE PROC Get_Geo_Info
AS
BEGIN
	SELECT SUM(Geo.Total) AS SumT
		 , Geo.City
		 , Geo.Latitude
		 , Geo.Longitude
	FROM (
		SELECT  COUNT(*) AS Total
			 , SFDC_IP.IP
			 , SFDC_IP.City
			 , SFDC_IP.Latitude
			 , SFDC_IP.Longitude
		FROM SFDC_IP
		LEFT JOIN IPAddress
		ON SFDC_IP.IP = IPAddress.IP
		GROUP BY SFDC_IP.IP
			   , SFDC_IP.City
			   , SFDC_IP.Latitude
			   , SFDC_IP.Longitude
		 ) AS Geo
	GROUP BY Geo.City
		   , Geo.Latitude
		   , Geo.Longitude
	-- ORDER BY SumT DESC
END			
GO
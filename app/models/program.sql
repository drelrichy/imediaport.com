Name	Type	Collation
1	program_id 	int
2	net_id	int
3	channel_id	varchar(15)
4	play_at	int
5	play_index	int
6	playday	enum('monday', 'tuesday', 'wednesday', 'thursday',...
7	play_date	date
8	listname	varchar(255)
9	program_name	varchar(255)
10	description	varchar(1000)
11	duration	int
12	start	int
13	stop	int
14	video_id	varchar(255)
15	video_title	varchar(255)
16	video_asset_type	enum('youtube', 'mp4', 'm3u8', 'facebook', 'custom...
17	thumb_url	varchar(300)
18	published	tinyint(1)
19	createdAt	timestamp
20	updatedAt	timestamp
21	active	tinyint(1)
create table dictionary_message
(
	locale varchar(255) not null,
	message_key varchar(255) not null,
	page varchar(255) not null,
	value varchar(255),
	constraint dictionary_message_pkey
		primary key (locale, message_key, page)
);
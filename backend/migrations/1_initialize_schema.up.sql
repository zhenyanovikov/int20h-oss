BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table users
(
    id         uuid          default uuid_generate_v4(),
    first_name text not null,
    last_name  text not null default '',
    email      text not null unique,
    avatar_url text,
    primary key (id)
);

create table user_credentials
(
    id           uuid not null default uuid_generate_v4(),
    user_id      uuid references users (id) on delete cascade,
    access_token text,
    expires_at   text,
    created_at   timestamp     default now(),
    primary key (id)
);

create table auctions
(
    id              uuid               default uuid_generate_v4(),
    title           text      not null,
    description     text      not null,
    image_urls      text[],
    status          text      not null,
    created_at      timestamp not null default now(),
    ended_at          timestamp,
    owner_id        uuid      not null references users (id) on delete cascade,
    winner_id       uuid references users (id) on delete cascade,
    starting_bid_id uuid      not null,
    winning_bid_id  uuid,
    primary key (id)
);

create table bids
(
    id         uuid      not null default uuid_generate_v4(),
    auction_id uuid,
    user_id    uuid references users (id) on delete cascade,
    amount     integer   not null,
    created_at timestamp not null default now(),
    primary key (id)
);

COMMIT;

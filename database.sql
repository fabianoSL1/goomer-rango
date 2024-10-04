CREATE TABLE restaurants (
     id SERIAL PRIMARY KEY,
     restaurant_name VARCHAR(255) NOT NULL,
     address VARCHAR(255) NOT NULL,
     picture VARCHAR(255) NOT NULL
);

CREATE TABLE restaurant_schedules (
    restaurant_id INT NOT NULL,
    week_day VARCHAR(15) NOT NULL,
    start_at VARCHAR(5),
    end_at VARCHAR(5),

    FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
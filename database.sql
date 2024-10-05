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


CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      restaurant_id INT NOT NULL,
      price FLOAT NOT NULL,
      product_name VARCHAR (255) NOT NULL,
      picture VARCHAR (255) NOT NULL,
      category VARCHAR(40) NOT NULL,

      FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE promotions (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL UNIQUE,
        price FLOAT NOT NULL,
        product_describe VARCHAR(255) NOT NULL,

        FOREIGN KEY (product_id) REFERENCES products (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE promotion_schedules (
         promotion_id INT NOT NULL,
         week_day VARCHAR(15) NOT NULL,
         start_at VARCHAR(5),
         end_at VARCHAR(5),

         FOREIGN KEY (promotion_id) REFERENCES promotions (id)
             ON DELETE CASCADE
             ON UPDATE CASCADE
);
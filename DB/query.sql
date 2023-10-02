-- Create the database
CREATE DATABASE StockPortfolioDB;
USE StockPortfolioDB;

-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    portfolioID VARCHAR(255),
    -- You can add other fields like email, hashed_password, etc.
    UNIQUE(username)  -- Ensuring usernames are unique
);

-- Stocks Table
CREATE TABLE Stocks (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(255),
    UNIQUE(symbol)  -- Ensuring stock symbols are unique
);

-- Portfolios Table
CREATE TABLE Portfolios (
    portfolio_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    stock_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,  -- If a user is deleted, their portfolio entries are also deleted.
    FOREIGN KEY (stock_id) REFERENCES Stocks(stock_id) ON DELETE CASCADE,  -- If a stock is deleted, the portfolio entries for it are also deleted.
    UNIQUE(user_id, stock_id)  -- Ensuring that each user can have each stock only once in their portfolio.
);

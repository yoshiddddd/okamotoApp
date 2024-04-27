package model

import "time"

type AvailablePayment string

const (
	Cash   AvailablePayment = "cash"
	QR     AvailablePayment = "QR"
	Credit AvailablePayment = "credit"
)

type Category string

const (
	Ramen        Category = "ramen"
	SuperMarcket Category = "supermarket"
)

type Store struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Address     string    `json:"address"`
	Information string    `json:"information"`
	Category    Category  `json:"category"`
	Payment     AvailablePayment `json:"payment"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	User        User      `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId      uint      `json:"user_id" gorm:"not null"`
}

type StoreResponse struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Address     string    `json:"address"`
	Information string    `json:"information"`
	Category    Category  `json:"category"`
	Payment     AvailablePayment   `json:"payment"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

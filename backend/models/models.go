package models

type Store struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Address string `json:"address"`
	CreatedAt string `json:"created_at"`
	UpdateAt string `json:"update_at"`
}
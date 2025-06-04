package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type User struct {
	Name       string   `json:"Name"`
	Age        uint16   `json:"Age"`
	Money      int16    `json:"Money"`
	Avg_grades float64  `json:"Avg_grades"`
	Happiness  float64  `json:"Happiness"`
	Hobbies    []string `json:"Hobbies"`
}
type Message struct {
	Message string `json:"message"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", home_page)
	mux.HandleFunc("/button_click", hndlRxData)
	mux.HandleFunc("/user_info", hndlTxUserInfo)

	fs := http.FileServer(http.Dir("templates/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Println("Server listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

// Вывод домашней страницы
func home_page(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("templates/home_page.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// Приём данных
func hndlRxData(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var msg Message
		err := json.NewDecoder(r.Body).Decode(&msg)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		fmt.Println("Получено сообщение:", msg.Message)
		w.WriteHeader(http.StatusOK)
	} else {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
	}
}

// Передача информации о пользователе
func hndlTxUserInfo(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		bob := User{
			Name:       "Пётр",
			Age:        25,
			Money:      -50,
			Avg_grades: 4.2,
			Happiness:  0.8,
			Hobbies:    []string{"Go", "Кино", "Футбол"},
		}

		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(bob)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}
	} else {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
	}
}

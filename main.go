package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type User struct {
	Name       string
	Age        uint16
	Money      int16
	Avg_grades float64
	Happiness  float64
	Hobbies    []string
}

type Message struct {
	Message string `json:"message"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", home_page)
	mux.HandleFunc("/button_click", buttonClickHandler)

	fs := http.FileServer(http.Dir("templates/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	log.Println("Server listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func home_page(w http.ResponseWriter, r *http.Request) {
	bob := User{
		Name:       "Bob",
		Age:        25,
		Money:      -50,
		Avg_grades: 4.2,
		Happiness:  0.8,
		Hobbies:    []string{"Football", "Skate", "Dance"},
	}

	tmpl, err := template.ParseFiles("templates/home_page.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = tmpl.Execute(w, bob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func buttonClickHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		var msg Message
		err := json.NewDecoder(r.Body).Decode(&msg)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println("Получено сообщение:", msg.Message)
		w.WriteHeader(http.StatusOK)
	} else {
		http.Error(w, "Метод не разрешен", http.StatusMethodNotAllowed)
	}
}

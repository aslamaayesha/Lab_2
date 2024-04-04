all: PutHTML

PutHTML:
	cp main.html /var/www/html/Lab_2/
	cp script.js /var/www/html/Lab_2/
	cp style.css /var/www/html/Lab_2/
	cp README.md /var/www/html/Lab_2/



	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/Lab_2/

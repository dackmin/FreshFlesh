compiled=./bin/freshflesh-v0.1_beta.js

all: compile

compile:
	@find ./src/ -type f -name "*.js" | xargs cat > $(compiled)

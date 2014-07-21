MERGE = ./MERGE
COMPILED = ./bin/freshflesh-v0.2_alpha.js
MINIFIED = ./bin/freshflesh-v0.2_alpha.min.js

all: compile

compile:
	/usr/local/bin/mergejs $(MERGE) $(COMPILED)

minify:
	java -jar /usr/local/bin/closure.jar --js_output_file=$(MINIFIED) $(COMPILED)

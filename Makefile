MERGE = ./MERGE
COMPILED = ./bin/freshflesh-v0.2.2_alpha.js
MINIFIED = ./bin/freshflesh-v0.2.2_alpha.min.js

all: compile

compile:
	/usr/local/bin/mergejs $(MERGE) $(COMPILED)

minify:
	java -jar /usr/local/bin/yui.jar $(COMPILED) -o $(MINIFIED) -v

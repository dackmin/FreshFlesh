VERSION = v0.3.2_alpha
MERGE = ./MERGE
COMPILED = ./bin/freshflesh-$(VERSION).js
MINIFIED = ./bin/freshflesh-$(VERSION).min.js
LATEST = ./bin/freshflesh-latest.js

all: compile minify latest

compile:
	/usr/local/bin/mergejs $(MERGE) $(COMPILED)

minify:
	java -jar /usr/local/bin/yui.jar $(COMPILED) -o $(MINIFIED)

latest:
	echo "/* $(VERSION) */" > $(LATEST) && cat $(MINIFIED) >> $(LATEST)

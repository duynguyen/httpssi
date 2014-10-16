REPORTER = spec

test:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd

test-w:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--ui tdd \
		--watch

.PHONY: test test-w
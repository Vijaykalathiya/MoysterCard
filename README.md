# MoysterCard Fare Engine

This repository contains a TypeScript implementation and tests for the MoysterCard fare calculation engine.
It focuses on clean design, SOLID principles, and testability.


## Getting Started

1. **Install dependencies**
	 ```bash
	 npm install
	 ```

2. **Run tests**
	 ```bash
	 npm test
	 ```

3. **Build the project (optional)**
	 ```bash
	 npm run build
	 ```

## Project Structure

- `src/` - TypeScript implementation files
- `tests/` - Jest unit tests and sample data
- `tests/testData.json` - Sample data file for dynamic, data-driven tests

## Managing Sample Data

The file `tests/testData.json` contains sample scenarios for fare calculation, daily cap, and weekly cap. You can edit or extend this file to add new test cases or modify existing ones. The test files automatically read from this JSON to run all scenarios, making it easy to manage and expand your test coverage without changing code.

**Example entry in `testData.json`:**
```json
{
	"WeeklyCap": [
		{
			"journeys": [
				{"date": "2025-10-20T11:00:00", "fromZone": 1, "toZone": 2}
			],
			"expectedTotal": 600
		}
	]
}
```

## Notes

- All input for fare calculations is provided via unit tests or the sample data file in `/tests/testData.json`.
- No frameworks or databases are used; the project is focused on clean, testable TypeScript code.

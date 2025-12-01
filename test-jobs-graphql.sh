#!/bin/bash

# Test Jobs GraphQL query
# Usage: ./test-jobs-graphql.sh [backend-url]
# Example: ./test-jobs-graphql.sh http://13.126.29.250:3001

BACKEND_URL="${1:-http://localhost:3001}"
GRAPHQL_ENDPOINT="${BACKEND_URL}/api/graphql"

echo "🔍 Testing Jobs query on: $GRAPHQL_ENDPOINT"
echo ""

curl -X POST "$GRAPHQL_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { Jobs(where: { status: { equals: \"active\" } }, limit: 100) { docs { id title location description status } totalDocs } }"
  }' \
  | python3 -m json.tool

echo ""
echo "✅ Test complete"

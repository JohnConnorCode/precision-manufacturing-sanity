#!/bin/bash

# Production Testing Script
# Tests all routes and verifies Sanity content is rendering

PROD_URL="https://precision-manufacturing-sanity-kjb3xxv03.vercel.app"

echo "🧪 Testing Production Deployment: $PROD_URL"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_count=0
pass_count=0
fail_count=0

test_route() {
  local route=$1
  local search_term=$2
  local min_count=${3:-1}

  test_count=$((test_count + 1))

  echo -n "Testing $route... "

  status=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL$route")

  if [ "$status" != "200" ]; then
    echo -e "${RED}FAIL${NC} (HTTP $status)"
    fail_count=$((fail_count + 1))
    return 1
  fi

  if [ -n "$search_term" ]; then
    count=$(curl -s "$PROD_URL$route" | grep -io "$search_term" | wc -l | tr -d ' ')

    if [ "$count" -ge "$min_count" ]; then
      echo -e "${GREEN}PASS${NC} (HTTP $status, found '$search_term' $count times)"
      pass_count=$((pass_count + 1))
      return 0
    else
      echo -e "${RED}FAIL${NC} (HTTP $status, but '$search_term' not found - only $count occurrences)"
      fail_count=$((fail_count + 1))
      return 1
    fi
  else
    echo -e "${GREEN}PASS${NC} (HTTP $status)"
    pass_count=$((pass_count + 1))
    return 0
  fi
}

echo "📄 Main Pages"
echo "----------"
test_route "/" "AS9100D" 1
test_route "/" "ISO 9001" 1
test_route "/" "ITAR" 1
test_route "/about" "John Smith" 1
test_route "/about" "Sarah Johnson" 1
test_route "/contact" "contact" 2
test_route "/careers" "career" 1

echo ""
echo "🔧 Services"
echo "----------"
test_route "/services" "service" 3
test_route "/services/5-axis-machining" "5-axis" 2
test_route "/services/5-axis-machining" "aerospace" 1
test_route "/services/adaptive-machining" "adaptive" 2
test_route "/services/metrology" "metrology" 2
test_route "/services/engineering" "engineering" 2

echo ""
echo "🏭 Industries"
echo "----------"
test_route "/industries" "industr" 3
test_route "/industries/aerospace" "aerospace" 2
test_route "/industries/defense" "defense" 2
test_route "/industries/energy" "energy" 2

echo ""
echo "📚 Resources"
echo "----------"
test_route "/resources" "resource" 2

echo ""
echo "⚖️ Compliance"
echo "----------"
test_route "/compliance/terms" "terms" 1
test_route "/compliance/supplier-requirements" "supplier" 1

echo ""
echo "================================================"
echo "📊 Test Results:"
echo "   Total: $test_count"
echo -e "   ${GREEN}Passed: $pass_count${NC}"
echo -e "   ${RED}Failed: $fail_count${NC}"
echo ""

if [ $fail_count -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi

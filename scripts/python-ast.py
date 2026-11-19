"""Print a position-independent Python AST digest for formatting verification."""

import ast
import hashlib
import sys

source = sys.stdin.buffer.read().decode('utf-8-sig')
parsed = ast.parse(source, type_comments=True)
print(hashlib.sha256(ast.dump(parsed, include_attributes=False).encode()).hexdigest())

/**
 * Named entities
 */
const ENTITIES = {
  '&quot;': '"',
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<'
};

/**
 * Elements which might not be closed, and should not be nested
 */
const BLOCK_TAGS = ['p', 'pre'];

/**
 * Creates a low-level string parser
 */
function createParser(string) {
  let pos = 0;
  let line = 1;
  let col = 0;

  function next() {
    const ch = string.charAt(pos++);

    if (ch === '\n') {
      line++;
      col = 0;
    } else {
      col++;
    }

    return ch;
  }

  function peek() {
    return string.charAt(pos);
  }

  function eof() {
    return peek() === '';
  }

  function error(msg) {
    throw new Error(`${msg} (${line}:${col})`);
  }

  return { next, peek, eof, error };
}

/**
 * Advance parser until character is found,
 * and return the string until that point.
 */
function untilChar(parser, ch) {
  const chars = [];

  while (chars[chars.length - 1] !== ch) {
    chars.push(parser.next());
  }

  return chars.join('');
}

function parseText(string) {
  const parser = createParser(string);
  let text = '';

  while (!parser.eof()) {
    text += handleText(parser);
  }

  return text;
}

function handleTag(parser) {
  const tagContent = untilChar(parser, '>').slice(1, -1);

  const closing = tagContent.charAt(0) === '/';
  if (closing) {
    return {
      tag: tagContent.slice(1),
      closing
    };
  }

  const parts = tagContent.split(' ');
  const tag = parts.shift().toLowerCase();
  const attributes = parts.map(part => {
    const [, name, value] = part.match(/([^=]+)="([^"]+)"/) || [];

    return {
      name,
      value: parseText(value)
    };
  });

  return { tag, attributes, closing };
}

function handleEntity(parser) {
  const entity = untilChar(parser, ';').toLowerCase();

  if (entity.charAt(1) === '#') {
    // Hex number
    const number = parseInt(`0${entity.slice(2, -1)}`, 16);
    return String.fromCharCode(number);
  } else if (entity in ENTITIES) {
    // Named entity
    return ENTITIES[entity];
  } else {
    return entity;
  }
}

function handleText(parser) {
  if (parser.peek() === '&') {
    return handleEntity(parser);
  } else {
    return parser.next();
  }
}

// HTML parser for Hacker News well-formed HTML content
export default function parseHTML(string) {
  const els = [{ children: [] }];
  const parser = createParser(string);

  while (!parser.eof()) {
    if (parser.peek() === '<') {
      const { tag, attributes, closing } = handleTag(parser);

      function addEl() {
        const el = { tag, attributes, children: [] };
        els[els.length - 1].children.push(el);
        els.push(el);
      }

      if (closing) {
        els.pop();
      } else if (els.length > 1 && BLOCK_TAGS.includes(tag)) {
        els.pop();
        addEl();
      } else {
        addEl();
      }
    } else {
      const text = handleText(parser);
      const { children } = els[els.length - 1];
      const lastChild = children[children.length - 1];

      if (typeof lastChild !== 'string') {
        children.push('');
      }

      children[children.length - 1] += text;
    }
  }

  return els[0].children;
}

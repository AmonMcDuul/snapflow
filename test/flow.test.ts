import { describe, it, expect } from 'vitest';
import { Flow } from '../src/core/flow';

describe('Flow', () => {
  it('creates definition', () => {
    const f = new Flow('id', 'name');
    f.addStep('a', 'A');
    f.addStep('b', 'B');
    f.connect('a', 'b');
    const def = f.toDefinition();
    expect(def.nodes['a'].next).toContain('b');
  });
});

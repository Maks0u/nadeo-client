import assert from 'assert';
import { escape, formatTime } from '../dist/Utils.js';

describe('Utils', () => {
    it('escape', () => {
        assert.equal(escape(''), '');
        assert.equal(escape('$s$13eF$14eor$15ego$06et$07dte$08dn I$09ds$0adla$0bcn$0ccd'), 'Forgotten Island');
        assert.equal(escape('$DA2I$EB3s$EB5e$FC6n$FC6g$EB5a$EB3r$DA2d'), 'Isengard');
        assert.equal(escape('$909D$908r$907e$906a$905m Emo$905t$906i$907o$908n$909s $905+'), 'Dream Emotions +');
        assert.equal(escape('$i$o$666Lost $FC0Archives $FFFFt Sp4ck0'), 'Lost Archives Ft Sp4ck0');
    });
    it('formatTime', () => {
        assert.equal(formatTime(0), '00:00.000');
        assert.equal(formatTime(1), '00:00.001');
        assert.equal(formatTime(10), '00:00.010');
        assert.equal(formatTime(100), '00:00.100');
        assert.equal(formatTime(1000), '00:01.000');
        assert.equal(formatTime(2100), '00:02.100');
        assert.equal(formatTime(2010), '00:02.010');
        assert.equal(formatTime(2001), '00:02.001');
        assert.equal(formatTime(60000), '01:00.000');
        assert.equal(formatTime(70000), '01:10.000');
        assert.equal(formatTime(120000), '02:00.000');
        assert.equal(formatTime(7425678), '123:45.678');
    });
});

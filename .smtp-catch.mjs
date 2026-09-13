import { SMTPServer } from 'smtp-server';
import { writeFileSync } from 'node:fs';
const server = new SMTPServer({
  disabledCommands: ['STARTTLS'],
  onAuth(auth, session, cb) {
    if (auth.username === 'testuser' && auth.password === 'testpass') return cb(null, { user: 'testuser' });
    cb(new Error('bad creds'));
  },
  onData(stream, session, cb) {
    let data = '';
    stream.on('data', (c) => (data += c));
    stream.on('end', () => { writeFileSync(process.env.OUT, `ENVELOPE ${JSON.stringify(session.envelope)}\n${data}`); cb(); });
  },
});
server.listen(2525, '127.0.0.1', () => console.log('smtp listening'));

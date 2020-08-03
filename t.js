import redis from 'redis';

const url = 'redis://h:p656fb1a87f63de8cd880929aa57a37f3ec61803bccad274912864666f481b049@ec2-54-92-161-44.compute-1.amazonaws.com:19449';

const client = redis.createClient({ url });

client.set('name', 'reyurehfdiue', (error, ok) => {
    if (error) { console.log(error); }
    console.log(ok);
    client.get('name', (err, val)=> console.log(err,val))
});

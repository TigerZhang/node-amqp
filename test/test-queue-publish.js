require('./harness');

var msg = {hello: "publish straight to the queue"};

connection.on('ready', function() {

  var q = connection.queue("node-amqp-publish-test", {autoDelete: true});

  q.on('basicConsumeOk', function() {
    q.publish(msg);
  });

  q.subscribe(function (m) {
    assert.equal(m.hello, msg.hello);
    connection.end();
  });

});

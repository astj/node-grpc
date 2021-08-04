/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
import wrapServerWithReflection from 'grpc-node-server-reflection';
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
import { HealthChecker, HealthService, ServingStatus } from "@astj/grpc-js-health-check";

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call: any, callback: any) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = wrapServerWithReflection(new grpc.Server());
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  const healthChecker = new HealthChecker({
    "": ServingStatus.SERVING
  });
  server.addService(HealthService, healthChecker.server);
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();

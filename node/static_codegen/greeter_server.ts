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

import { HelloRequest, HelloReply } from "./pb/helloworld_pb";
import { GreeterService } from "./pb/helloworld_grpc_pb";

import * as grpc from "@grpc/grpc-js";
import { HealthChecker, HealthService, ServingStatus } from "@astj/grpc-js-health-check";

/**
 * Implements the SayHello RPC method.
 */
const sayHello: grpc.handleUnaryCall<HelloRequest, HelloReply> = (
  call,
  callback
) => {
  var reply = new HelloReply();
  reply.setMessage("Hello " + call.request.getName());
  callback(null, reply);
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  const server = new grpc.Server();
  server.addService(GreeterService, { sayHello: sayHello });
  const healthChecker = new HealthChecker({
    "": ServingStatus.SERVING
  });
  server.addService(HealthService, healthChecker.server);
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();

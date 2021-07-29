This is the static code generation variant of the Node examples. Code in these examples is pre-generated using protoc and the Node gRPC protoc plugin, and the generated code can be found in various `*_pb.js` files. The command line sequence for generating those files is as follows (assuming that `protoc` and `grpc_node_plugin` are present, and starting in the directory which contains this README.md file):

```sh
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ -I ../../protos ../../protos/helloworld.proto
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./route_guide/ --grpc_out=grpc_js:./route_guide/ -I ../../protos ../../protos/route_guide.proto
```

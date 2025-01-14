export const getConnection = () => {
  return new WebSocket("ws://localhost:6541/ws/chat");
};

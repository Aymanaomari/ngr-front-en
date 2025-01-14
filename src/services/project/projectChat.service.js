import ax from "../../utils/axios";

export const getGroupMessages = (chatGroupId) => {
  return ax.get(`/registred-user/chat/group/messages/${chatGroupId}`);
};

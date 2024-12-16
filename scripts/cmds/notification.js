const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "notification",
		aliases: ["🔸️", "noti"],
		version: "1.6",
		author: "Lord King",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		longDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <tin nhắn>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: "𝗢𝗛𝗛 𝗠𝗬 𝗗𝗘𝗔𝗥 𝗔𝗗𝗠𝗜𝗡 𝗣𝗟𝗘𝗔𝗦𝗘 𝗠𝗔𝗬 𝗬𝗢𝗨 𝗘𝗡𝗧𝗘𝗥 𝗧𝗛𝗘 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘 𝗬𝗢𝗨 𝗪𝗔𝗡𝗧 𝗧𝗢 𝗦𝗘𝗡𝗗 𝗧𝗢 𝗔𝗟𝗟 𝗚𝗥𝗢𝗨𝗢 𝗖𝗛𝗔𝗧𝗦 𝗧𝗛𝗔𝗧 𝗧𝗛𝗘 𝗕𝗢𝗧 𝗜𝗦 𝗜𝗡 𝗣𝗟𝗘𝗔𝗦𝗘. 𝗔𝗡𝗗 𝗙𝗢𝗟𝗟𝗢𝗪𝗘𝗥 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗔𝗧𝗜𝗢𝗡 𝗢𝗙 𝗨𝗦𝗜𝗡𝗚 𝗧𝗛𝗜𝗦 𝗖𝗠𝗗.",
			notification: "👻𝗕𝗥𝗘𝗔𝗞𝗜𝗡𝗚 𝗡𝗘𝗪🙃",
			sendingNotification: "𝗜 𝗛𝗔𝗩𝗘 𝗦𝗧𝗔𝗥𝗧𝗘𝗗 𝗧𝗢 𝗦𝗘𝗡𝗗 𝗧𝗛𝗘 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗢𝗡 𝗙𝗥𝗢𝗠 𝗠𝗬 𝗗𝗘𝗔𝗥 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 𝗧𝗢 %1 𝗖𝗛𝗔𝗧 𝗚𝗥𝗢𝗨𝗣𝗦 𝗧𝗛𝗔𝗧 𝗜 𝗔𝗠 𝗜𝗡. 𝗜𝗙 𝗬𝗢𝗨 𝗪𝗔𝗡𝗧 𝗔𝗗𝗗 𝗠𝗘 𝗜𝗡 𝗦𝗢𝗠𝗘 𝗚𝗥𝗢𝗨𝗣𝗦 𝗣𝗟𝗘𝗔𝗦𝗘.",
			sentNotification: "✅ 𝗦𝗘𝗡𝗧 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗡 𝗧𝗢 %1 𝗚𝗥𝗢𝗨𝗣𝗦 𝗦𝗨𝗦𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬",
			errorSendingNotification: " 𝗕𝗨𝗬 𝗧𝗛𝗘 𝗜𝗦 𝗔 𝗘𝗥𝗥𝗢𝗥 𝗢𝗖𝗖𝗨𝗥𝗥𝗘𝗗 𝗪𝗛𝗜𝗟𝗘 𝗦𝗘𝗡𝗗𝗜𝗡𝗚 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 𝗧𝗢 %1 𝗚𝗥𝗢𝗨𝗣𝗦:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n━━━━━━━━━━━━━━━━━━\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};

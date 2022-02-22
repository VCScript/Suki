const { MessageEmbed, Guild } = require('discord.js');
const e = require('../utils/Emojis');

module.exports = class guildCreate {
	constructor (client) {
		this.client = client;
	}

	async execute (guild = Guild) {
		this.client.guildDB.create({
			guildID: guild.id,
			prefix: 's!',
		});

		const embed = new MessageEmbed()
			.setAuthor({
				name: `${this.client.user.username} - Adicionado`,
				iconURL: this.client.user.avatarURL(),
			})
			.setColor('#7A0BC0')
			.setTimestamp()
			.addFields(
				{
					name: `${e.Cloud} Nome:`,
					value: `> ${guild.name}`,
				},
				{
					name: `${e.ID} ID do Servidor`,
					value: `> ${guild.id}`,
				},
				{
					name: `${e.User} Total de Usuários`,
					value: `> ${guild.memberCount}`,
				}
			);

		this.client.channels.cache
			.get(process.env.SERVER_LOGS)
			.send({ embeds: [embed] });
	}
};

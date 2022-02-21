const { MessageEmbed } = require("discord.js");

module.exports = class messageCreate {
  constructor(client) {
    this.client = client;
  }

  async execute(message) {
    const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);

    const server = await this.client.guildDB.findOne({ guildID: message.guild.id });
    if(!server) await this.client.guildDB.create({ guildID: message.guild.id })

    var prefix = prefix;
    prefix = server.prefix;

    if (message.content.match(GetMention(this.client.user.id))) {
      message.reply(`Olá ${message.author}, meu prefixo é **${prefix}**`);
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

    if(!cmd) return;

    try {
      cmd.execute({ message, args });
    } catch (err) {
      const erro = new MessageEmbed()
      .setTitle(`❌ Ocorreu um Erro!`)
      .setDescription(`Desculpe, um erro foi encontrado e o comando não foi executado corretamente. Peço que reporte o Bug aos meus desenvolvedores e aguarde o mesmo ser resolvido.]nObrigado.`)
      .setColor("PURPLE")
      .setTimestamp()
      await message.reply({embeds: [erro]})
      console.log(err)
    }
    const user = await this.client.userDB.findOne({_id: message.author.id})
    if(!user) await this.client.userDB.create({_id: message.author.id})
  }
};

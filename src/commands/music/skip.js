const Command = require('../../structures/Command');

module.exports = class Skip extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            description: {
                content: 'skip command',
            },
            enabled: true,
            cooldown: 4,
            args: false,
        });
    }

    async run(client, message) {
        const player = client.music.players.get(message.guild.id);
        this.skip(player);
        return message.channel.send('Skipped...');
    }

    async execute(client, interaction) {
        const player = client.music.players.get(interaction.guild.id);
        this.skip(player);
        await interaction.reply('Skipped...');
    }

    skip(player) {
        if (player.trackRepeat) player.setTrackRepeat(false);
        if (player.queueRepeat) player.setQueueRepeat(false);
        if (player) player.skip();
    }
};

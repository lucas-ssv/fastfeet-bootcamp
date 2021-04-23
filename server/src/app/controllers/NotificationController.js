import Notification from '../schemas/Notification';

class NotificationController {
    async update(req, res) {
        const { id } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            id,
            {
                read: true,
            },
            {
                new: true,
            }
        );

        if (!notification) {
            return res.status(400).json({ error: 'Notification not exists!' });
        }

        return res.status(200).json(notification);
    }
}

export default new NotificationController();
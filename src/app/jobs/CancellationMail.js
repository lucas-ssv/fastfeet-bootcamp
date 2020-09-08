import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { deliveryProblems, formatDate } = data;

        await Mail.sendMail({
            to: `${deliveryProblems.delivery.deliveryman.name} <${deliveryProblems.delivery.deliveryman.email}>`,
            subject: 'Encomenda cancelada.',
            template: 'cancellation',
            html: `
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #222; max-width: 600px;">
                    <strong>Olá, ${deliveryProblems.delivery.deliveryman.name}</strong>
                    <p>Houve um cancelamento, confira os detalhes abaixo:</p>
                    <strong>Descrição: </strong>${deliveryProblems.description}
                    <p>
                        <strong>Cliente: </strong> ${deliveryProblems.delivery.recipient.name} <br />
                        <strong>Encomenda: </strong> ${deliveryProblems.delivery.product} <br />
                        <strong>Data/Hora: </strong> ${formatDate} <br />
                        <br />
                        Equipe FastFeet      
                    </p>
                </div>
            `
            // context: {
            //     deliveryman: deliveryProblems.delivery.deliveryman.name,
            //     recipient: deliveryProblems.delivery.recipient.name,
            //     order: deliveryProblems.delivery.product,
            //     date: format(
            //         deliveryProblems.delivery.canceled_at,
            //         "'dia' dd 'de' MMMM', às' H:mm'h'",
            //         {
            //             locale: pt,
            //         }
            //     )
            // }
        });
    }
}

export default new CancellationMail();
export function statusColor(status) {
    const colors = {
        type: null,
        color: null,
    };

    switch (status) {
        case 'PENDENTE':
            colors.color = '#C1BC35';
            colors.type = 'PENDENTE';
            break;
        case 'RETIRADA':
            colors.color = '#4D85EE';
            colors.type = 'RETIRADA';
            break;
        case 'CANCELADA':
            colors.color = '#DE3B3B';
            colors.type = 'CANCELADA';
            break;
        case 'ENTREGUE':
            colors.color = '#2CA42B';
            colors.type = 'ENTREGUE';
            break;
        default:
    }

    return colors;
}

const { FormatMoney } = require('format-money-js');

const moneyFormatter = new FormatMoney({
    decimals: 2,
    append: true,
})

const formatPrice = (number = 0) => {
    return moneyFormatter.from(number, { symbol: '$' });
}

module.exports = {
    formatPrice,
}
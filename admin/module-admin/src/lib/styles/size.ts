const widthX = 0;

export default {
    width: function (size?: number): number {
        return size ? (size + (size * widthX)) : 1
    },
}
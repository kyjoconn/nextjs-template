/* misc helpers that don't fit into other categories */

export const isClientSide = () => {
    // window object will exist when running in the browswer, but be
    // undefined when running on the server
    return typeof window !== "undefined";
};

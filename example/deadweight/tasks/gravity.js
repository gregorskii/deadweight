export default (dwt, config) => {
  // async
  return () => {
    const { logger } = dwt;

    logger.info(config.gravity.quote);
    logger.info(config.gravity.other);
  };
};

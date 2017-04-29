export default (dwt, config) => {
  return () => {
    const { logger } = dwt;

    logger.info(config.specific.quote);
  };
};

import { DefaultApp } from '@/modules/default';
import { Box, Button, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {}

const Page = async (props: Props) => {
  const {} = props;
  return (
    <Box>
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="center" textAlign="center">
          <Award size={60} color="#3182CE" />
          <Heading size="2xl">NFT Certificate Platform</Heading>
          <Text fontSize="xl" maxW="container.md">
            Explore our NFT certificate platform where educational achievements are secured on the
            blockchain. Own your credentials and build your professional portfolio.
          </Text>

          <Flex gap={4} pt={4}>
            <Button
              as={Link}
              href="/certificate"
              size="lg"
              colorScheme="blue"
              rightIcon={<ExternalLink size={16} />}
            >
              Go to Certificate Platform
            </Button>
          </Flex>
        </VStack>
      </Container>
      <DefaultApp />
    </Box>
  );
};

export default Page;

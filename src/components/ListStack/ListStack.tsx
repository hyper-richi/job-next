'use client';
import { List } from '@mantine/core';
import VSCodeIcon from '../../../public/images/svg/badges/visualstudiocode.svg';
import MantineIcon from '../../../public/images/svg/badges/mantine.svg';
import NextdotjsIcon from '../../../public/images/svg/badges/nextdotjs.svg';
import TypescriptIcon from '../../../public/images/svg/badges/typescript.svg';
import VercelIcon from '../../../public/images/svg/badges/vercel.svg';
import SassIcon from '../../../public/images/svg/badges/sass.svg';
import PrettierIcon from '../../../public/images/svg/badges/prettier.svg';
import ESLintIcon from '../../../public/images/svg/badges/eslint.svg';
import styles from './ListStack.module.scss';

const ListStack = () => {
  return (
    <div>
      <List spacing='xs' size='sm'>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Framework - Next JS <NextdotjsIcon width={24} height={24} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Language - TypeScript <TypescriptIcon width={24} height={24} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Deployment - Vercel
          <VercelIcon width={24} height={24} color={'#000000'} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Styling - Sass <SassIcon width={24} height={24} color={'#CC6699'} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Components - Mantine UI <MantineIcon width={24} height={24} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Linting - ESLint
          <ESLintIcon width={24} height={24} color={'#4B32C3'} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          Formatting - Prettier <PrettierIcon width={24} height={24} />
        </List.Item>
        <List.Item classNames={{ itemLabel: styles.itemLabel }}>
          VSCode - <VSCodeIcon width={24} height={24} />
        </List.Item>
      </List>
    </div>
  );
};

export default ListStack;

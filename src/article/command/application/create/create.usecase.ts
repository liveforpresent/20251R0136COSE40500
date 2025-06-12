import { Inject, Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { Article } from '../../domain/article';
import { CreateArticleRequestDto } from './dto/create.request.dto';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { CreateArticleResponseDto } from './dto/create.response.dto';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(requestDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    const { title, organization, description, location, startAt, endAt, registrationUrl } = requestDto;
    const articleId = Identifier.create();

    // Article 도메인 엔티티 생성
    const article = Article.create({
      id: articleId,
      title: title,
      organization: organization,
      description: description,
      location: location,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      registrationUrl: registrationUrl,
      scrapCount: 0,
      viewCount: 0,
      mediaIds: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.articleCommandRepository.save(article);

    return { articleId: articleId.value };
  }
}
